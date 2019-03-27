package com.springsource.roo.noncas.service;

import com.google.gson.*;
//import com.spt.hrms.util.ConstantKeyAuthorizeUtil;
//import com.spt.hrms.util.HRMSAuthorizeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.*;

/**
 * Created by : Watcharaphong Ketcharoen
 * Created Date : 9/03/2015
 */
public abstract class AbstractHRMSService {

//    @Autowired
//    HRMSAuthorizeUtil hrmsAuthorizeUtil;

    protected static Logger LOGGER = LoggerFactory.getLogger(AbstractHRMSService.class);
    protected String HRMSServer = "172.16.250.68:8099/rest";
    protected static Properties connectProperties = null;

    protected String webServicesString = "";
    protected String resultString = "";

    protected RestTemplate restTemplate = new RestTemplate();
    protected JsonParser parser = new JsonParser();
    JsonSerializer<Date> ser = new JsonSerializer<Date>() {
        @Override
        public JsonElement serialize(Date src, Type typeOfSrc,
                                     JsonSerializationContext context) {
            return src == null ? null : new JsonPrimitive(src.getTime());
        }
    };

    JsonDeserializer<Date> deser = new JsonDeserializer<Date>() {
        @Override
        public Date deserialize(JsonElement json, Type typeOfT,
                                JsonDeserializationContext context) throws JsonParseException {
            return json == null ? null : new Date(json.getAsLong());
        }
    };

    protected Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm").create();

    static {
        Resource resource = new ClassPathResource("/hrms.server.properties");
        try{
            connectProperties = PropertiesLoaderUtils.loadProperties(resource);

        } catch (IOException e){
            LOGGER.error("Error : {}", e);
        }
    }

    public AbstractHRMSService(){
        this.HRMSServer  = connectProperties.getProperty("HRMSServer");
    }

    public String getHRMSServer() {
        return HRMSServer;
    }
    public void setHRMSServer(String HRMSServer) {
        this.HRMSServer = HRMSServer;
    }
    public String getWebServicesString() {
        return webServicesString;
    }
    public void setWebServicesString(String webServicesString) {
        this.webServicesString = webServicesString;
    }
    public String getResultString() {
        LOGGER.debug("request :{}",getWebServicesString());
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers=setHeaderUserMapDetails(headers,getWebServicesString());
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        ResponseEntity<String> reponseEntity = restTemplate.exchange(getWebServicesString(), HttpMethod.GET, entity, String.class);
        //resultString = restTemplate.getForObject(getWebServicesString(), String.class);
        return reponseEntity.getBody();
    }

    public ResponseEntity<String> getResult() {
        LOGGER.debug("request :{}",getWebServicesString());
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers=setHeaderUserMapDetails(headers,getWebServicesString());
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        ResponseEntity<String> reponseEntity = restTemplate.exchange(getWebServicesString(), HttpMethod.GET, entity, String.class);
        //resultString = restTemplate.getForObject(getWebServicesString(), String.class);
        return reponseEntity;
    }

    public String getResultString(String webServicesString) {
        LOGGER.debug("request :{}",webServicesString);
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers=setHeaderUserMapDetails(headers,webServicesString);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        ResponseEntity<String> reponseEntity = restTemplate.exchange(webServicesString, HttpMethod.GET, entity, String.class);
        //resultString = restTemplate.getForObject(webServicesString, String.class);
        return reponseEntity.getBody();
    }
    public HttpHeaders setHeaderUserMapDetails(HttpHeaders headers, String webServicesString){
//        if(!(webServicesString.contains("rest/security"))){
//            List<String> listOuCode=new ArrayList<>();
//            List<String> listUserName=new ArrayList<>();
//            listOuCode.add(hrmsAuthorizeUtil.getOuCode());
//            listUserName.add(hrmsAuthorizeUtil.getUserName());
//            headers.put(ConstantKeyAuthorizeUtil.OU_CODE_KEY, listOuCode);
//            headers.put(ConstantKeyAuthorizeUtil.USER_NAME_KEY, listUserName);
//        }
        return headers;
    }

}
