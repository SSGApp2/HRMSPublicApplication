// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.springsource.roo.noncas.base;

import com.springsource.roo.noncas.base.BaseEntity;
import java.util.Date;

privileged aspect BaseEntity_Roo_JavaBean {
    
    public String BaseEntity.getCreatedBy() {
        return this.createdBy;
    }
    
    public void BaseEntity.setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    
    public String BaseEntity.getUpdatedBy() {
        return this.updatedBy;
    }
    
    public void BaseEntity.setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }
    
    public String BaseEntity.getStatus() {
        return this.status;
    }
    
    public void BaseEntity.setStatus(String status) {
        this.status = status;
    }
    
    public Date BaseEntity.getCreatedDate() {
        return this.createdDate;
    }
    
    public void BaseEntity.setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
    
    public Date BaseEntity.getUpdatedDate() {
        return this.updatedDate;
    }
    
    public void BaseEntity.setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }
    
}
