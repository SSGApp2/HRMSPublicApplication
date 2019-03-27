package com.springsource.roo.noncas.util;

import org.joda.time.Period;
import org.joda.time.chrono.BuddhistChronology;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

/**
 * Created by : Nattakan S.
 * Created Date : 06/07/2015
 */
public class HrmsUtil {

    private static Logger LOGGER = LoggerFactory.getLogger(HrmsUtil.class);

    public static Timestamp getDateWithRemoveTime(String date) {
        String newFormateDate = convertStringDate(date);
        Timestamp maxTimeDate = Timestamp.valueOf(newFormateDate + " " + "00:00:00.000");

        return maxTimeDate;
    }

    public static Timestamp getDateWithMaxTime(String date) {
        String newFormateDate = convertStringDate(date);
        Timestamp minTimeDate = Timestamp.valueOf(newFormateDate + " " + "23:59:59.999");

        return minTimeDate;
    }

    public static Timestamp getDateWithRemoveTime(Date date) {
        SimpleDateFormat newformat = new SimpleDateFormat("yyyy-MM-dd", HrmsUtil.getSystemLocale());
        Timestamp maxTimeDate = Timestamp.valueOf(newformat.format(date) + " " + "00:00:00.000");

        return maxTimeDate;
    }

    public static Timestamp getConverDateToTimeStamp(Date date) {
        SimpleDateFormat newformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", HrmsUtil.getSystemLocale());
        Timestamp timeDate = Timestamp.valueOf(newformat.format(date));

        return timeDate;
    }

    public static Timestamp getDateWithMaxTime(Date date) {
        SimpleDateFormat newformat = new SimpleDateFormat("yyyy-MM-dd", HrmsUtil.getSystemLocale());
        Timestamp minTimeDate = Timestamp.valueOf(newformat.format(date) + " " + "23:59:59.999");

        return minTimeDate;
    }

    /*
    * Time format must 00:00
    * */
    public static Timestamp getDateAndTimeFromParameter(Date date, String time) {
        SimpleDateFormat newformat = new SimpleDateFormat("yyyy-MM-dd", HrmsUtil.getSystemLocale());
        Timestamp returnTime = Timestamp.valueOf(newformat.format(date) + " " + time + ":00.000");

        return returnTime;
    }

    private static String convertStringDate(String dateString1) {
        String newDate = "";
        try {
            Date date = new SimpleDateFormat("dd/MM/yyyy", HrmsUtil.getSystemLocale()).parse(dateString1);
            SimpleDateFormat newformat = new SimpleDateFormat("yyyy-MM-dd", HrmsUtil.getSystemLocale());
            newDate = newformat.format(date);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
        }

        return newDate;
    }

    //checkEmpty for list
    public static boolean isEmpty(List<?> checkList) {
        Boolean returnValue = true;
        if (checkList != null && !checkList.isEmpty() && checkList.size() > 0) {
            returnValue = false;
        }
        return returnValue;
    }

    public static boolean isNotEmpty(List<?> checkList) {
        Boolean returnValue = false;
        if (checkList != null && !checkList.isEmpty() && checkList.size() > 0) {
            returnValue = true;
        }
        return returnValue;
    }

    public static Date addDaysToDate(Date d, int days) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(d);
        cal.add(Calendar.DATE, days);
        return cal.getTime();
    }

    public static Date addMinuteToDate(Date d, int minute) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(d);
        cal.add(Calendar.MINUTE, minute);
        return cal.getTime();
    }

    public static boolean isNotEmpty(String checkString) {
        boolean returnValue = false;
        if (checkString != null && checkString.length() > 0) {
            returnValue = true;
        }
        return returnValue;
    }

    public static boolean isEmpty(String checkString) {
        boolean returnValue = true;
        if (checkString != null && checkString.length() > 0) {
            returnValue = false;
        }
        return returnValue;
    }

    public static boolean isNotNull(Object object) {
        boolean returnValue = false;
        if (object != null) {
            returnValue = true;
        }
        return returnValue;
    }

    public static boolean isNull(Object object) {
        boolean returnValue = false;
        if (object == null) {
            returnValue = true;
        }
        return returnValue;
    }

    public static Period adjustPeriod(Period p) {
        if (p.getMinutes() >= 60) {
            int hour = (int) p.getMinutes() / 60;
            p = p.plusHours(hour);
            p = p.minusMinutes(hour * 60);
        }
        if (p.getHours() >= 24) {
            int day = (int) p.getHours() / 24;
            p = p.plusDays(day);
            p = p.minusHours(day * 24);
        }
        return p;
    }

    public static Locale getSystemLocale() {
        return Locale.US;
    }

    public static String getCurrentDateLocal() {
        return new org.joda.time.DateTime().withChronology(BuddhistChronology.getInstance()).toString("dd/MM/YYYY HH:mm");
    }

}