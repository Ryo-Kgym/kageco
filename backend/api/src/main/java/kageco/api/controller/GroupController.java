package kageco.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import kageco.api.controller.dto.GetGroupsGroup;
import kageco.api.controller.dto.GetGroupsResponse;

@RestController
@RequestMapping("/api/v5/groups")
@Tag(name = "Groups", description = "グループ管理API")
public class GroupController {

    @GetMapping()
    @Operation(summary = "グループ一覧取得", description = "全てのグループの一覧を取得します")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "正常にグループ一覧を取得")
    })
    public GetGroupsResponse getGroups(){

        return GetGroupsResponse.builder()
            .groups(List.of(
                GetGroupsGroup.builder().id("1").name("group1").build(),
                GetGroupsGroup.builder().id("2").name("group2").build()
            ))
            .build();
    }
}