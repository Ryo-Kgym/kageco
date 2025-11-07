package kageco.api.entity.household;

import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import kageco.api.entity.pub.Group;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tag", schema = "household")
public class Tag {
  @Id
  @Column(name = "id", nullable = false, length = Integer.MAX_VALUE)
  private String id;

  @NotNull
  @Column(name = "name", nullable = false, length = Integer.MAX_VALUE)
  private String name;

  @NotNull
  @ColumnDefault("'#FFFFFF'")
  @Lob
  @Column(name = "color_code", nullable = false)
  private String colorCode;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @OnDelete(action = OnDeleteAction.RESTRICT)
  @JoinColumn(name = "group_id", nullable = false)
  private Group group;

  @NotNull
  @ColumnDefault("0")
  @Column(name = "display_order", nullable = false)
  private Integer displayOrder;

  @OneToMany(mappedBy = "tag")
  private Set<DetailTag> detailTags = new LinkedHashSet<>();
}
