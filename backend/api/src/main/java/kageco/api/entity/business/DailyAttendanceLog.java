package kageco.api.entity.business;

import java.time.OffsetDateTime;

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

@Getter
@Setter
@Entity
@Table(name = "daily_attendance_log", schema = "business")
public class DailyAttendanceLog {
    @Id
    @Column(name = "id", nullable = false, length = Integer.MAX_VALUE)
    private String id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "daily_attendance_id", nullable = false)
    private DailyAttendance dailyAttendance;

    @NotNull
    @Column(name = "state", nullable = false, length = Integer.MAX_VALUE)
    private String state;

    @Column(name = "memo", length = Integer.MAX_VALUE)
    private String memo;

    @NotNull
    @Column(name = "datetime", nullable = false)
    private OffsetDateTime datetime;

}