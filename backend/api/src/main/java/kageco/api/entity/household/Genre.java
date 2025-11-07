package kageco.api.entity.household;

import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import org.hibernate.annotations.ColumnDefault;

import kageco.api.entity.pub.Group;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
    name = "genre",
    schema = "household",
    indexes = {@Index(name = "genre_iocome_type_idx", columnList = "iocome_type")})
public class Genre {
  @Id
  @Size(max = 26)
  @Column(name = "id", nullable = false, length = 26)
  private String id;

  @Size(max = 50)
  @NotNull
  @Column(name = "name", nullable = false, length = 50)
  private String name;

  @Size(max = 16)
  @NotNull
  @Column(name = "genre_type", nullable = false, length = 16)
  private String genreType;

  @Size(max = 8)
  @NotNull
  @Column(name = "iocome_type", nullable = false, length = 8)
  private String iocomeType;

  @ColumnDefault("true")
  @Column(name = "valid_flag")
  private Boolean validFlag;

  @NotNull
  @Column(name = "display_order", nullable = false)
  private Integer displayOrder;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "group_id", nullable = false)
  private Group group;

  @OneToMany(mappedBy = "genre")
  private Set<Category> categories = new LinkedHashSet<>();

  @OneToMany(mappedBy = "genre")
  private Set<CreditCardDetail> creditCardDetails = new LinkedHashSet<>();

  @OneToMany(mappedBy = "genre")
  private Set<DailyDetail> dailyDetails = new LinkedHashSet<>();
}
