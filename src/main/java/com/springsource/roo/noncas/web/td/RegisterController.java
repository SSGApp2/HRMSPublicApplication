package com.springsource.roo.noncas.web.td;

import com.springsource.roo.noncas.service.ADRestService;
import com.springsource.roo.noncas.service.ORRestService;
import com.springsource.roo.noncas.service.PMRestService;
import com.spt.hrms.model.Province;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/register")
@Controller
public class RegisterController {

    @Autowired
    PMRestService pmRestService;

    @Autowired
    ORRestService orRestService;

    @RequestMapping(produces = "text/html")
    public String resetPassword(Model uiModel) {
        List<Province> provinces = pmRestService.findAllProvince();
        uiModel.addAttribute("provinces", provinces);
        return "register/register";
    }
}
