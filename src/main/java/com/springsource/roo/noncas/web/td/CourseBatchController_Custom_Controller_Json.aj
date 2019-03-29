
package com.springsource.roo.noncas.web.td;


import com.springsource.roo.noncas.service.PMRestService;
import com.spt.hrms.model.Employee;
import flexjson.JSONSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import java.util.Map;

privileged aspect CourseBatchController_Custom_Controller_Json {

    private static Logger LOGGER = LoggerFactory.getLogger(CourseBatchController_Custom_Controller_Json.class);

    @RequestMapping(value = "/confirmTrainee", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> CourseBatchController.confirmTrainee(
            @RequestParam(value = "resultIdTrainee", required = false) Long resultIdTrainee
            , @RequestParam(value = "traineeCode", required = false) String traineeCode){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        try {
            String result = tdRestService.confirmTrainee(resultIdTrainee,traineeCode);
            return new ResponseEntity<String>(result,headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/registerTrainee", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> CourseBatchController.registerTrainee(
            @RequestParam(value = "batchId", required = false) Long batchId
            ,@RequestParam(value = "resultIdTrainee", required = false) Long resultIdTrainee
            ,@RequestParam(value = "traineeCode", required = false) String traineeCode
            ,@RequestParam(value = "status", required = false) String status
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        try {
            String result = tdRestService.registerTrainee(batchId,resultIdTrainee,traineeCode,status);
            return new ResponseEntity<String>(result,headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/findEmployeeByEmpCode", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public  ResponseEntity<String> CourseBatchController.findEmployeeByEmpCode(@RequestParam(value = "empCode")String empCode){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            Employee result = pmRestService.findEmployeeByEmployeeCode(empCode);

            return new ResponseEntity<String>(new JSONSerializer().deepSerialize(result), headers, HttpStatus.OK);

        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/findTDRP20", method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public  ResponseEntity<String> CourseBatchController.findTDRP20(@RequestParam(value = "batchId") Long batchId){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            Map result = tdRestService.findTDRP20(batchId);
            return new ResponseEntity<String>(new JSONSerializer().deepSerialize(result), headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":"+e.getMessage()+"\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/findDataForEvaluationPage", method = RequestMethod.GET, headers = "Accept=application/json")
    public ResponseEntity<String> CourseBatchController.findDataForEvaluationPage(
            @RequestParam(value = "courseCode", required = false) String courseCode
            ,@RequestParam(value = "batchId", required = false) String batchId) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            Map result = tdRestService.findDataForEvaluationPage(courseCode,batchId);
            return new ResponseEntity<String>((new JSONSerializer().exclude("*.class").deepSerialize(result)), headers, HttpStatus.OK);
        }catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/createFromJsonArray", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> CourseBatchController.createFromJsonArray(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
//            String result = tdRestService.createFromJsonArray(json);
//            return new ResponseEntity<String>((new JSONSerializer().exclude("*.class").deepSerialize(result)), headers, HttpStatus.OK);
            return tdRestService.createFromJsonArray(json);
        }catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
