package kageco.api.entity.household;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import kageco.api.entity.pub.Group;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "import_file_history", schema = "household")
public class ImportFileHistory {
  @Id
  @Size(max = 26)
  @Column(name = "id", nullable = false, length = 26)
  private String id;

  @Size(max = 128)
  @NotNull
  @Column(name = "file_name", nullable = false, length = 128)
  private String fileName;

  @Size(max = 16)
  @NotNull
  @Column(name = "file_type", nullable = false, length = 16)
  private String fileType;

  @NotNull
  @Column(name = "import_datetime", nullable = false)
  private Instant importDatetime;

  @Size(max = 26)
  @NotNull
  @Column(name = "import_user_id", nullable = false, length = 26)
  private String importUserId;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "group_id", nullable = false)
  private Group group;
}
