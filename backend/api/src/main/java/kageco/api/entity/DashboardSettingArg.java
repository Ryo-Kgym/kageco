package kageco.api.entity;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "dashboard_setting_args", schema = "household")
public class DashboardSettingArg {
    @Id
    @Size(max = 26)
    @Column(name = "id", nullable = false, length = 26)
    private String id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "setting_id", nullable = false)
    private DashboardSetting setting;

    @Size(max = 32)
    @NotNull
    @Column(name = "type", nullable = false, length = 32)
    private String type;

    @Size(max = 32)
    @NotNull
    @Column(name = "value", nullable = false, length = 32)
    private String value;

}