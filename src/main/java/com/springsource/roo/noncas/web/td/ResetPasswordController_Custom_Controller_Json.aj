
package com.springsource.roo.noncas.web.td;


import com.springsource.roo.noncas.domain.ParameterDetail;
import com.springsource.roo.noncas.service.ADRestService;
import com.spt.hrms.model.Employee;
import flexjson.JSONSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

privileged aspect ResetPasswordController_Custom_Controller_Json {

    private static Logger LOGGER = LoggerFactory.getLogger(ResetPasswordController_Custom_Controller_Json.class);



    @RequestMapping(value = "/findParameterCas", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> ResetPasswordController.findParameterCas(){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        try {
            ParameterDetail result = ParameterDetail.findParameterDetailByAppParameterCodeAndCode("50","21");
            return new ResponseEntity<String>((new JSONSerializer().exclude("*.class").exclude("appParameter.*").deepSerialize(result)),headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/resetPasswordCas", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> ResetPasswordController.resetPasswordCas(
            @RequestParam(value = "email", required = false) String email
    ){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        try {
            String result = adRestService.resetPasswordCas(email);
            return new ResponseEntity<String>(result,headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
