package com.springsource.roo.noncas.aop;

import com.springsource.roo.noncas.domain.ParameterLang;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.util.WebUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

public class ApplicationPropertiesListener extends ContextLoaderListener {
    private static final String LOCAL_PROPERTIES = "application_th.properties";
    private static final String DEFAULT_PROPERTIES = "application.properties";

//    private Logger LOGGER = LoggerFactory.getLogger(LocaleChangeLanguageAspect.class);

    @Autowired
    private ParameterLang parameterLang;

    public void contextInitialized(ServletContextEvent event) {
        initializedSpringMessage(event);
    }

    public void initializedSpringMessage (ServletContextEvent event){
        ServletContext sc = event.getServletContext();
        WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(sc);
//        LOGGER.debug(" ######  {}", wac.getDisplayName() + " initializing...");
        Properties propertiesLocal = new Properties();
        Properties propertiesDefault = new Properties();
        String path = "/WEB-INF/i18n/" ;
        try{
            //Get path on project
            String exportPathPrefix = WebUtils.getRealPath(sc, path)+ File.separator;

            // Load file properties
            propertiesLocal.load(new FileInputStream(exportPathPrefix+LOCAL_PROPERTIES));
            propertiesDefault.load(new FileInputStream(exportPathPrefix+DEFAULT_PROPERTIES));

            //Delete file on Folder when file exists
//			deleteFile(localFile,defaultFile);

            //Find data on databases
            findAllParameter(propertiesLocal,propertiesDefault);

            //Create file  properties
            createFileOutput(exportPathPrefix+LOCAL_PROPERTIES, propertiesLocal);
            createFileOutput(exportPathPrefix+DEFAULT_PROPERTIES,propertiesDefault);
//            LOGGER.debug("************ Generate success ************");

        } catch (Exception e){
//            LOGGER.error("Error {}",e);
            System.out.print(e);
        }
    }

    private void findAllParameter(Properties local , Properties defaults){
        List<ParameterLang> listParameter = parameterLang.findAllParameterLangs();
        for (ParameterLang param : listParameter){
            // set the properties value
            local.put(param.getCode(), param.getLocalDesc() != null ? param.getLocalDesc() : "");
            defaults.put(param.getCode() , param.getEngDesc()!=null? param.getEngDesc():"");
        }
    }

    private void createFileOutput(String fileOutput , Properties prop) throws IOException {
        FileOutputStream fileOutputStream = new FileOutputStream(fileOutput);
        prop.store(fileOutputStream, null);
        fileOutputStream.close();

    }
}
