package com.springsource.roo.noncas.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.spt.hrms.model.CourseBatch;
import com.spt.hrms.model.CourseBatchResult;
import com.spt.hrms.model.PositionJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class TDRestService extends AbstractHRMSService {
    private static Logger LOGGER = LoggerFactory.getLogger(TDRestService.class);

    public TDRestService() {
        this.HRMSServer = connectProperties.getProperty("TD-HRMSServer");
    }

    public List<CourseBatch> findCourseBatchId(Long batchId){
        List<CourseBatch> courseBatches = new ArrayList<CourseBatch>();

        try {
            String url="http://" + HRMSServer + "/coursebatches/findCourseBatchByBatchId/" + batchId;
            setWebServicesString(url);
            JsonArray jsonArray = parser.parse(getResultString()).getAsJsonArray();
            for (JsonElement jsonElement : jsonArray) {
                CourseBatch courseBatch = gson.fromJson(jsonElement, CourseBatch.class);
                courseBatches.add(courseBatch);
            }
            LOGGER.debug("Get requester subordinate result size [{}]", courseBatches.size());
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }

        return courseBatches;
    }

    public List<CourseBatchResult> findBatchResultSearchByResultCodeAndResultGen(String resultCode, String resultGen){
        List<CourseBatchResult> courseBatchResults = new ArrayList<CourseBatchResult>();

        try {
            String url="http://" + HRMSServer + "/coursebatchresults/findBatchResultSearchByResultCodeAndResultGen/" + resultCode + "/" + resultGen;
            setWebServicesString(url);
            JsonArray jsonArray = parser.parse(getResultString()).getAsJsonArray();
            for (JsonElement jsonElement : jsonArray) {
                CourseBatchResult courseBatchResult = gson.fromJson(jsonElement, CourseBatchResult.class);
                courseBatchResults.add(courseBatchResult);
            }
            LOGGER.debug("Get requester subordinate result size [{}]", courseBatchResults.size());
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }

        return courseBatchResults;
    }

    public String confirmTrainee(Long resultIdTrainee, String traineeCode){
        String result = "";
        try {
            String url="http://" + HRMSServer + "/coursebatches/confirmTrainee/" + resultIdTrainee + "/" + traineeCode;
            setWebServicesString(url);
            result = getResultString();
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }

        return result;
    }

    public String registerTrainee(Long batchId,Long resultIdTrainee,String traineeCode,String status){
        String result = "";
        try {
            String url="http://" + HRMSServer + "/coursebatches/registerTrainee/"+ batchId + "/" + resultIdTrainee + "/" + traineeCode + "/" + status;
            setWebServicesString(url);
            result = getResultString();
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }

        return result;
    }

    public Map findTDRP20(Long batchId){
        Map result = new HashMap();
        try {
            String url="http://" + HRMSServer + "/coursebatches/findTDRP20/"+ batchId;
            setWebServicesString(url);
            result = gson.fromJson(getResultString(),Map.class);
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }

        return result;
    }

    public Map findDataForEvaluationPage(String courseCode,String batchId){
        Map result = new HashMap();
        try {
            String url="http://" + HRMSServer + "/coursebatches/findDataForEvaluationPage/"+ courseCode+"/"+batchId;
            setWebServicesString(url);
            result = gson.fromJson(getResultString(),Map.class);
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }

        return result;
    }

    public ResponseEntity<String> createFromJsonArray(String json){
        ResponseEntity<String> result;
        try {
            String url="http://" + HRMSServer + "/coursebatches/createFromJsonArray";
//            setWebServicesString(url);
            result = sentPostJsonString(url,json);
        } catch (Exception e) {
            LOGGER.error("Error : {}", e.getMessage());
            throw new RuntimeException(e);
        }

        return result;
    }
}