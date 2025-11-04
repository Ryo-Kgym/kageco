package kageco.api.controller.dto;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class GetGroupsGroup {
    String id;
    String name;
}
