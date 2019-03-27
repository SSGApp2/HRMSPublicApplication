package com.springsource.roo.noncas.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.springsource.roo.noncas.util.HrmsUtil;
import com.spt.hrms.model.CourseBatch;
import com.spt.hrms.model.CourseBatchResult;
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
}