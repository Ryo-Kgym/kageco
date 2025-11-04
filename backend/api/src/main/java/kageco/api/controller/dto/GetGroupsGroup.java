package kageco.api.controller.dto;

import lombok.Builder;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Builder
@Schema(description = "グループ情報")
public class GetGroupsGroup {

    @Schema(description = "グループID", example = "1")
    private String id;

    @Schema(description = "グループ名", example = "group1")
    private String name;
}