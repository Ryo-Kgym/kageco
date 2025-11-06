package kageco.api.entity.household;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

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
import kageco.api.entity.pub.Group;

@Getter
@Setter
@Entity
@Table(name = "credit_card_summary", schema = "household")
public class CreditCardSummary {
    @Id
    @Size(max = 26)
    @Column(name = "id", nullable = false, length = 26)
    private String id;

    @Size(max = 16)
    @NotNull
    @Column(name = "credit_card", nullable = false, length = 16)
    private String creditCard;

    @NotNull
    @Column(name = "withdrawal_date", nullable = false)
    private LocalDate withdrawalDate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @NotNull
    @Column(name = "total_amount", nullable = false, precision = 10)
    private BigDecimal totalAmount;

    @NotNull
    @Column(name = "count", nullable = false)
    private Integer count;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @OneToMany(mappedBy = "summary")
    private Set<CreditCardDetail> creditCardDetails = new LinkedHashSet<>();

}