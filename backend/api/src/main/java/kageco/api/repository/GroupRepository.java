package kageco.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import kageco.api.entity.pub.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, String> {
    /**
     * 作成日時の昇順でグループを取得
     */
    @Query("SELECT g FROM Group g ORDER BY g.id ASC")
    List<Group> findAllOrderByCreatedAt();

}