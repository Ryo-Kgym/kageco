package kageco.api.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

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
import jakarta.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "credit_card_detail", schema = "household")
public class CreditCardDetail {
    @Id
    @Size(max = 26)
    @Column(name = "id", nullable = false, length = 26)
    private String id;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "genre_id", nullable = false)
    private Genre genre;

    @Size(max = 8)
    @NotNull
    @Column(name = "iocome_type", nullable = false, length = 8)
    private String iocomeType;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @NotNull
    @Column(name = "amount", nullable = false, precision = 10)
    private BigDecimal amount;

    @Size(max = 64)
    @Column(name = "memo", length = 64)
    private String memo;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "summary_id", nullable = false)
    private CreditCardSummary summary;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

}