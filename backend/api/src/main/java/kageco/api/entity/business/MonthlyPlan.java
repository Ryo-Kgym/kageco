package kageco.api.entity.business;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import kageco.api.entity.pub.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
    name = "monthly_plan",
    schema = "business",
    uniqueConstraints = {
      @UniqueConstraint(
          name = "monthly_plan_user_id_year_month_key",
          columnNames = {"user_id", "year_month"})
    })
public class MonthlyPlan {
  @Id
  @Column(name = "id", nullable = false, length = Integer.MAX_VALUE)
  private String id;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Size(max = 7)
  @NotNull
  @Column(name = "year_month", nullable = false, length = 7)
  private String yearMonth;

  @NotNull
  @Column(name = "planned_working_hours_lower", nullable = false)
  private BigDecimal plannedWorkingHoursLower;

  @NotNull
  @Column(name = "planned_working_hours_upper", nullable = false)
  private BigDecimal plannedWorkingHoursUpper;

  @NotNull
  @Column(name = "business_days", nullable = false)
  private Integer businessDays;
}
