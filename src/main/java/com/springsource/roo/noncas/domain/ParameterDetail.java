package com.springsource.roo.noncas.domain;
import com.springsource.roo.noncas.base.BaseEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooToString
@RooJpaActiveRecord(inheritanceType = "TABLE_PER_CLASS")
@RooJson(deepSerialize = true)
public class ParameterDetail extends BaseEntity {

    /**
     */
    @NotNull
    @Column(unique = true)
    private String code;

    /**
     */
    private String parameterDescription;

    /**
     */
    private String parameterValue1;

    /**
     */
    private String parameterValue2;

    /**
     */
    private String parameterValue3;

    /**
     */
    private String parameterValue4;

    /**
     */
    private String parameterValue5;

    /**
     */
    private String parameterValue6;

    /**
     */
    private String parameterValue7;

    /**
     */
    private String parameterValue8;

    /**
     */
    private String parameterValue9;

    /**
     */
    private String parameterValue10;

    /**
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appParameter")
    private AppParameter appParameter;
}
