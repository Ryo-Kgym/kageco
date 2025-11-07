package kageco.api.entity.household;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "freee_link_detail", schema = "household")
public class FreeeLinkDetail {
  @Id
  @Column(name = "id", nullable = false, length = Integer.MAX_VALUE)
  private String id;

  @NotNull
  @ColumnDefault("now()")
  @Column(name = "linked_datetime", nullable = false)
  private OffsetDateTime linkedDatetime;

  @NotNull
  @Column(name = "detail_id", nullable = false, length = Integer.MAX_VALUE)
  private String detailId;
}
