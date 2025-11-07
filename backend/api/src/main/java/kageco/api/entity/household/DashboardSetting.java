package kageco.api.entity.household;

import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import kageco.api.entity.pub.Group;
import kageco.api.entity.pub.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "dashboard_setting", schema = "household")
public class DashboardSetting {
  @Id
  @Size(max = 26)
  @Column(name = "id", nullable = false, length = 26)
  private String id;

  @Size(max = 32)
  @NotNull
  @Column(name = "feature", nullable = false, length = 32)
  private String feature;

  @NotNull
  @Column(name = "\"order\"", nullable = false)
  private Integer order;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "group_id", nullable = false)
  private Group group;

  @OneToMany(mappedBy = "setting")
  private Set<DashboardSettingArg> dashboardSettingArgs = new LinkedHashSet<>();
}
