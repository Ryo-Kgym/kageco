package kageco.api.controller.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Builder
@Schema(description = "グループ一覧取得レスポンス")
public class GetGroupsResponse {

    @Schema(description = "グループのリスト")
    private List<GetGroupsGroup> groups;
}