package com.springsource.roo.noncas.domain;
import com.springsource.roo.noncas.base.BaseEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import javax.validation.constraints.NotNull;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooToString
@RooJpaActiveRecord(inheritanceType = "TABLE_PER_CLASS")
@RooJson(deepSerialize = true)
public class ParameterLang extends BaseEntity {

    /**
     */
    private String lDesc;

    /**
     */
    @NotNull
    private String code;

    /**
     */
    private String localDesc;

    /**
     */
    private String engDesc;

    /**
     */
    private String paramType;
}
