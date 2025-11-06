package kageco.api.entity.household;

import java.util.List;
import java.util.Map;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import kageco.api.entity.pub.Group;

@Getter
@Setter
@Entity
@Table(name = "condition_session", schema = "household")
public class ConditionSession {
    @Id
    @Column(name = "key", nullable = false, length = Integer.MAX_VALUE)
    private String key;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @NotNull
    @Column(name = "value", nullable = false)
    private List<Map<String, Object>> value;

    @NotNull
    @Column(name = "data_type", nullable = false, length = Integer.MAX_VALUE)
    private String dataType;

}