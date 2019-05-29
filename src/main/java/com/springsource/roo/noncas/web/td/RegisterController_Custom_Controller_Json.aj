package com.springsource.roo.noncas.web.td;

import com.spt.hrms.model.Distric;
import com.spt.hrms.model.Province;
import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

public aspect RegisterController_Custom_Controller_Json {

    @RequestMapping(value = "/findAllProvince",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> RegisterController.findAllProvince()
            {
                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Type", "application/json;charset=UTF-8");
                List<Province> provinces = pmRestService.findAllProvince();

                Collections.sort(provinces, new Comparator<Province>() {
                    public int compare(Province c1, Province c2) {
                        String str1 = c1.getProvinceName();
                        String str2 = c2.getProvinceName();
                        if ((str1).compareTo(str2) < 0) return -1;
                        if ((str1).compareTo(str2) > 0) return 1;
                        return 0;
                    }});
                return new ResponseEntity<String>(new JSONSerializer().deepSerialize(provinces), headers, HttpStatus.OK);
            }

    @RequestMapping(value = "/findDistricByProviceCode", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> RegisterController.findDistricByProviceCode(@ModelAttribute("provinceCode")String provinceCode) {
        String result;
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<Distric> districts = pmRestService.findDistricByProvunceDoce(provinceCode);

        result = new JSONSerializer().deepSerialize(districts);

        return new ResponseEntity<String>(result, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/getSubDistrictByDistrictCode/{code}",method = RequestMethod.GET, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> RegisterController.getSubDistrictByDistrictCode(@PathVariable("code") String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<Map> subDistricts = pmRestService.getSubDistrictByDistrictCode(code);
        return new ResponseEntity<String>(new JSONSerializer().deepSerialize(subDistricts), headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/customerRegistry",method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> RegisterController.customerRegistry(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        try {
            return orRestService.customerRegistry(json);
        } catch (Exception e) {
           return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
