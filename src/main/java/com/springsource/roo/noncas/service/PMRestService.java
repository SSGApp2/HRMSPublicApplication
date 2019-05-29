package com.springsource.roo.noncas.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.springsource.roo.noncas.util.HrmsUtil;
import com.spt.hrms.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class PMRestService extends AbstractHRMSService {
    private static Logger LOGGER = LoggerFactory.getLogger(PMRestService.class);

    public PMRestService() {
        this.HRMSServer = connectProperties.getProperty("PM-HRMSServer");
    }

    public Employee findEmployeeByEmployeeCode(String employeeCode) {
        List<Employee> employees = new ArrayList<Employee>();

        try {
            setWebServicesString("http://"+ HRMSServer+ "/employee/findByEmpCodeEquals/" + employeeCode);
            JsonArray jsonArray = parser.parse(getResultString()).getAsJsonArray();
            for (JsonElement jsonElement : jsonArray) {
                Employee employee = gson.fromJson(jsonElement, Employee.class);
                employees.add(employee);
            }
            LOGGER.debug("find Emp By Emp Code Result [{}]", employees);
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }
        if (HrmsUtil.isNotEmpty(employees)) {
            return employees.get(0);
        } else {
            return null;
        }
    }

    public List<Province> findAllProvince() {
        List<Province> provinces = new ArrayList<Province>();
        try {
            setWebServicesString("http://" + HRMSServer + "/province/getAllProvince");
            JsonArray jsonArray = parser.parse(getResultString()).getAsJsonArray();
            for (JsonElement jsonElement : jsonArray) {
                Province province = gson.fromJson(jsonElement, Province.class);
                provinces.add(province);
            }
            // LOGGER.debug("Get requester subordinate result size [{}]", empTypes.size());
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }

        return provinces;
    }

    public List<Distric> findDistricByProvunceDoce(String province) {
        List<Distric> districs = new ArrayList<Distric>();
        try {
            setWebServicesString("http://" + HRMSServer + "/distric/" + province);
            JsonArray jsonArray = parser.parse(getResultString()).getAsJsonArray();
            for (JsonElement jsonElement : jsonArray) {
                Distric distric = gson.fromJson(jsonElement, Distric.class);
                districs.add(distric);
            }
            // LOGGER.debug("Get requester subordinate result size [{}]", empTypes.size());
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }

        return districs;
    }

    public List<Map> getSubDistrictByDistrictCode(String code) {
        List<Map> subDistricts = new ArrayList<Map>();
        try {
            setWebServicesString("http://" + HRMSServer + "/subdistrict/getSubDistrictByDistrictCode/" + code);
            JsonArray jsonArray = parser.parse(getResultString()).getAsJsonArray();
            for (JsonElement jsonElement : jsonArray) {
                Map map = gson.fromJson(jsonElement, Map.class);
                subDistricts.add(map);
            }
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }

        return subDistricts;
    }
}