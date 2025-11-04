package kageco.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kageco.api.controller.dto.GetGroupsGroup;
import kageco.api.controller.dto.GetGroupsResponse;

@RestController
@RequestMapping("/api/v5/groups")
public class GroupController {

    @GetMapping()
    public GetGroupsResponse getGroups(){

        return GetGroupsResponse.builder()
            .groups(List.of(
                GetGroupsGroup.builder().id("1").name("group1").build(),
                GetGroupsGroup.builder().id("2").name("group2").build()
            ))
            .build();
    }
}
