package kageco.api.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "グループ情報")
public class GetGroupsGroup {

  @Schema(description = "グループID", example = "1")
  private String id;

  @Schema(description = "グループ名", example = "group1")
  private String name;
}
