package kageco.api.controller.dto;

import java.util.List;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class GetGroupsResponse {

    List<GetGroupsGroup> groups;

}
