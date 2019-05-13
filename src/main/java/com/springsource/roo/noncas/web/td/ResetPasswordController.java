package com.springsource.roo.noncas.web.td;

import com.springsource.roo.noncas.service.ADRestService;
import com.springsource.roo.noncas.service.PMRestService;
import com.springsource.roo.noncas.service.TDRestService;
import com.springsource.roo.noncas.util.HrmsUtil;
import com.spt.hrms.model.CourseBatch;
import com.spt.hrms.model.CourseBatchResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;

@RequestMapping("/resetpassword")
@Controller
public class ResetPasswordController {

    @Autowired
    ADRestService adRestService;

    @RequestMapping(produces = "text/html")
    public String resetPassword(Model uiModel) {
        return "resetpassword/resetPassword";
    }
}
