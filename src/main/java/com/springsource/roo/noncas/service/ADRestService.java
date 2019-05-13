package com.springsource.roo.noncas.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.springsource.roo.noncas.util.HrmsUtil;
import com.spt.hrms.model.Employee;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class ADRestService extends AbstractHRMSService {
    private static Logger LOGGER = LoggerFactory.getLogger(ADRestService.class);

    public ADRestService() {
        this.HRMSServer = connectProperties.getProperty("AD-HRMSServer");
    }

    public String resetPasswordCas(String email) {
        String result = "Fail";

        try {
            setWebServicesString("http://"+ HRMSServer+ "/appusers/resetPasswordCas/" + email);
            result = getResultString();
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }
        return result;
    }
}