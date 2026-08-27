package br.com.financeiro.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "tb_despesa")
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String descricao;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;

    @Column(name = "data_despesa", nullable = false)
    private LocalDate dataDespesa;

    @ManyToOne
    @JoinColumn(name = "local_compra_id", nullable = false)
    private LocalCompra lugarCompra;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public BigDecimal getValor() {
        return valor;
    }
    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
    public LocalDate getDataDespesa() {
        return dataDespesa;
    }
    public void setDataDespesa(LocalDate dataDespesa) {
        this.dataDespesa = dataDespesa;
    }
    public LocalCompra getLugarCompra() {
        return lugarCompra;
    }
    public void setLugarCompra(LocalCompra lugarCompra) {
        this.lugarCompra = lugarCompra;
    }
}