package kageco.api.entity;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

import org.hibernate.annotations.ColumnDefault;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "daily_attendance", schema = "business")
public class DailyAttendance {
    @Id
    @Column(name = "id", nullable = false, length = Integer.MAX_VALUE)
    private String id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "break_second", nullable = false)
    private Integer breakSecond;

    @NotNull
    @Column(name = "start_datetime", nullable = false)
    private OffsetDateTime startDatetime;

    @NotNull
    @Column(name = "end_datetime", nullable = false)
    private OffsetDateTime endDatetime;

    @Size(max = 7)
    @Column(name = "year_month", length = 7)
    private String yearMonth;

    @OneToMany(mappedBy = "dailyAttendance")
    private Set<DailyAttendanceLog> dailyAttendanceLogs = new LinkedHashSet<>();

}