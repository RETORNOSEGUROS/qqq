
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";

const initialVendas = [
  { cliente: "Cliente A", valorNegocio: 12000, valorComissao: 800, responsavel: "Daniel", parcelas: 1, dataFechamento: "2024-04-01", dataPrevistaPagamento: "", status: "Pendente" },
  { cliente: "Cliente B", valorNegocio: 15000, valorComissao: 1200, responsavel: "Tati", parcelas: 1, dataFechamento: "2024-04-02", dataPrevistaPagamento: "", status: "Pendente" },
  { cliente: "Cliente C", valorNegocio: 10000, valorComissao: 700, responsavel: "Modesti", parcelas: 1, dataFechamento: "2024-04-04", dataPrevistaPagamento: "", status: "Pendente" },
  { cliente: "Cliente D", valorNegocio: 18000, valorComissao: 1300, responsavel: "Pablo", parcelas: 1, dataFechamento: "2024-04-06", dataPrevistaPagamento: "", status: "Pendente" }
];

export default function PainelInicial() {
  const [filtro, setFiltro] = useState("todos");
  const [vendas, setVendas] = useState(initialVendas);
  const [novoCadastro, setNovoCadastro] = useState({
    cliente: "",
    valorNegocio: "",
    valorComissao: "",
    responsavel: "",
    parcelas: "",
    dataFechamento: "",
    dataPrevistaPagamento: "",
  });

  const cadastrarVenda = () => {
    setVendas([...vendas, { ...novoCadastro, valorNegocio: Number(novoCadastro.valorNegocio), valorComissao: Number(novoCadastro.valorComissao), parcelas: Number(novoCadastro.parcelas), status: "Pendente" }]);
    setNovoCadastro({ cliente: "", valorNegocio: "", valorComissao: "", responsavel: "", parcelas: "", dataFechamento: "", dataPrevistaPagamento: "" });
  };

  const vendasFiltradas = filtro === "todos" ? vendas : vendas.filter((v) => v.responsavel === filtro);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl mb-12"
      >
        <Card className="p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Nova Venda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Nome do Cliente" value={novoCadastro.cliente} onChange={(e) => setNovoCadastro({ ...novoCadastro, cliente: e.target.value })} />
            <Input placeholder="Valor do Negócio (R$)" type="number" value={novoCadastro.valorNegocio} onChange={(e) => setNovoCadastro({ ...novoCadastro, valorNegocio: e.target.value })} />
            <Input placeholder="Valor da Comissão (R$)" type="number" value={novoCadastro.valorComissao} onChange={(e) => setNovoCadastro({ ...novoCadastro, valorComissao: e.target.value })} />
            <Input placeholder="Parcelas" type="number" value={novoCadastro.parcelas} onChange={(e) => setNovoCadastro({ ...novoCadastro, parcelas: e.target.value })} />
            <Input placeholder="Data Fechamento" type="date" value={novoCadastro.dataFechamento} onChange={(e) => setNovoCadastro({ ...novoCadastro, dataFechamento: e.target.value })} />
            <Input placeholder="Data Prevista Pagamento" type="date" value={novoCadastro.dataPrevistaPagamento} onChange={(e) => setNovoCadastro({ ...novoCadastro, dataPrevistaPagamento: e.target.value })} />
            <Select onValueChange={(value) => setNovoCadastro({ ...novoCadastro, responsavel: value })}>
              <SelectTrigger className="w-full">{novoCadastro.responsavel || "Selecione o Responsável"}</SelectTrigger>
              <SelectContent>
                <SelectItem value="RM1">Vendedor RM1</SelectItem>
                <SelectItem value="RM2">Vendedor RM2</SelectItem>
                <SelectItem value="GG1">Gerente GG1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mt-6" onClick={cadastrarVenda}>Cadastrar Venda</Button>
        </Card>
      </motion.div>
    </div>
  );
}
