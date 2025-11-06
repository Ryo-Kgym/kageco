package kageco.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kageco.api.controller.dto.GetGroupsGroup;
import kageco.api.controller.dto.GetGroupsResponse;
import kageco.api.repository.GroupRepository;

@RestController
@RequestMapping("/api/v5/groups")
@Tag(name = "Groups", description = "グループ管理API")
@RequiredArgsConstructor
public class GroupController {
    private final GroupRepository groupRepository;

    @GetMapping()
    @Operation(summary = "グループ一覧取得", description = "全てのグループの一覧を取得します")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "正常にグループ一覧を取得")
    })
    public GetGroupsResponse getGroups() {
        var groups = this.groupRepository.findAllOrderByCreatedAt();

        return GetGroupsResponse.builder()
            .groups(
                groups.stream().map(group -> GetGroupsGroup.builder()
                    .id(group.getId())
                    .name(group.getName())
                    .build()
                ).toList()
            )
            .build();
    }
}