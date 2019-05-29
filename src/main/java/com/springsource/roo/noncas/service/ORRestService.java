package com.springsource.roo.noncas.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class ORRestService extends AbstractHRMSService {
    private static Logger LOGGER = LoggerFactory.getLogger(ORRestService.class);

    public ORRestService() {
        this.HRMSServer = connectProperties.getProperty("OR-HRMSServer");
    }

    public ResponseEntity<String> customerRegistry(String json) {
        ResponseEntity<String> result;
        try {
            String url = "http://" + this.HRMSServer + "/customers/customerRegistry";
            result = sentPostJsonString(url,json);
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }
        return result;
    }
}