package com.springsource.roo.noncas.web.td;
import com.springsource.roo.noncas.service.PMRestService;
import com.springsource.roo.noncas.service.TDRestService;
import com.springsource.roo.noncas.util.HrmsUtil;
import com.spt.hrms.model.CourseBatch;
import com.spt.hrms.model.CourseBatchResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;

@RequestMapping("/coursebatches")
@Controller
@RooWebScaffold(path = "coursebatches", formBackingObject = CourseBatch.class)
@RooWebJson(jsonObject = CourseBatch.class)
public class CourseBatchController {

    @Autowired
    TDRestService tdRestService;

    @Autowired
    PMRestService pmRestService;

    @RequestMapping(value = "/courseBatchTraineeConfirm/{code}/{generator}", produces = "text/html")
    public String courseBatchTraineeConfirm(Model uiModel
            , @PathVariable("code")String code
            , @PathVariable("generator")String generator) {
        CourseBatch courseBatch = tdRestService.findCourseBatchId(Long.parseLong(generator)).get(0);
        courseBatch.setBatchStartCourseDate(HrmsUtil.getDateWithRemoveTime(courseBatch.getBatchStartCourseDate()));
        courseBatch.setBatchFinishCourseDate(HrmsUtil.getDateWithMaxTime(courseBatch.getBatchFinishCourseDate()));
        Date today = new Date();
        String checkTime = "InTime";
        if(today.after(courseBatch.getBatchFinishCourseDate())){
            checkTime = "Timeout";
        }
        if (today.before(courseBatch.getBatchStartCourseDate())){
            checkTime = "NotYetTime";
        }
        CourseBatchResult courseBatchResult = tdRestService.findBatchResultSearchByResultCodeAndResultGen(code,generator).get(0);
        uiModel.addAttribute("courseBatchResult",courseBatchResult);
        uiModel.addAttribute("checkTime",checkTime);
        return "coursebatches/courseBatchTraineeConfirm";
    }

    @RequestMapping(value = "/courseBatchTraineeJoin/{code}/{generator}", produces = "text/html")
    public String  courseBatchTraineeJoin(Model uiModel
            ,@PathVariable("code")String code
            ,@PathVariable("generator")String generator) {
        CourseBatch courseBatch = tdRestService.findCourseBatchId(Long.parseLong(generator)).get(0);
        courseBatch.setBatchOpenRegisterDate(HrmsUtil.getDateWithRemoveTime(courseBatch.getBatchOpenRegisterDate()));
        courseBatch.setBatchCloseRegisterDate(HrmsUtil.getDateWithMaxTime(courseBatch.getBatchCloseRegisterDate()));
        Date today = new Date();
        String checkTime = "InTime";
        if(today.after(courseBatch.getBatchCloseRegisterDate())){
            checkTime = "Timeout";
        }
        if(today.before(courseBatch.getBatchOpenRegisterDate())){
            checkTime = "NotYetTime";
        }
        CourseBatchResult courseBatchResult = tdRestService.findBatchResultSearchByResultCodeAndResultGen(code,generator).get(0);
        uiModel.addAttribute("courseBatchResult",courseBatchResult);
        uiModel.addAttribute("checkTime",checkTime);
        return "coursebatches/courseBatchTraineeJoin";
    }

    @RequestMapping(value = "/courseBatchResultEvaluation", produces = "text/html")
    public String courseBatchResultEvaluation(Model uiModel
            , @RequestParam(value = "courseCode", required = false) String courseCode
            , @RequestParam(value = "courseBatchId", required = false) Long courseBatchId
    ) {
        uiModel.addAttribute("courseCode", courseCode);
        uiModel.addAttribute("courseBatchId", courseBatchId);
        return "coursebatches/courseBatchResultEvaluation";
    }
}
