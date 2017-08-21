package domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by yy187 on 2017/8/21.
 */
@Entity
public class DownItem {
    @Id
    @GeneratedValue
    private Integer idloaditem;
    @NotNull(message = "必须有名字")
    private String name;
    @NotNull(message = "必须有介绍")
    private String intro;
    private Date uploaddata;
    private String uploader;
    public DownItem(){

    }
    public Integer getIdloaditem() {
        return idloaditem;
    }

    public void setIdloaditem(Integer idloaditem) {
        this.idloaditem = idloaditem;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public Date getUploaddata() {
        return uploaddata;
    }

    public void setUploaddata(Date uploaddata) {
        this.uploaddata = uploaddata;
    }

    public String getUploader() {
        return uploader;
    }

    public void setUploader(String uploader) {
        this.uploader = uploader;
    }
}
