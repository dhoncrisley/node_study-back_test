alter view vw_notasfiscais
as
    select
        n.nvenda as nvenda,
        n.dtvenda as dtvenda,
        n.modalidade as modalidade,
        n.qtdparcelas as qtdparcelas,
        n.descacres as descacres,
        n.codclii as codclii,
        n.cpfcnpjcliente as dtvenda,
        n.nomecliente as dtvenda,
        n.ufcliente as dtvenda,
        n.inscricaoestadualcliente as dtvenda,
        n.indiedestcliente as dtvenda,
        n.cepcliente as dtvenda,
        n.enderecocliente as dtvenda,
        n.n_enderecocliente as dtvenda,
        n.complementoenderecocliente as dtvenda,
        n.bairrocliente as dtvenda,
        n.codmunicipiocliente as dtvenda,
        n.nomemunicipiocliente as dtvenda,
        n.fonecliente as dtvenda,
        n.emailcliente as dtvenda,
        n.valorentrada as dtvenda,
        n.codvendedori as dtvenda,
        n.valorfinal as dtvenda,
        n.valordinheiro as dtvenda,
        n.valortroco as dtvenda,
        n.codempresa as dtvenda,
        n.codcaixai as dtvenda,
        n.verprocemissao as dtvenda,
        n.serie as dtvenda,
        n.chaveacessonfe as dtvenda,
        n.dtautorizacaonfe as dtvenda,
        n.dtemissaonfe as dtvenda,
        n.dtcancelamentonfe as dtvenda,
        n.dtvendaimportada as dtvenda,
        n.tipoimportacao as dtvenda,
        n.nvendaimportacao as dtvenda,
        n.protocoloautorizacaonfe as dtvenda,
        n.recibonfe as dtvenda,
        n.codigocontabil as dtvenda,
        n.tipoemitente as dtvenda,
        n.tpambiente as dtvenda,
        n.naturezaoperacao as dtvenda,
        n.valortotalprodutos as dtvenda,
        n.valortotalbaseicms as dtvenda,
        n.valortotalbasesubstrib as dtvenda,
        n.valortotalicmsretidooutrasuf as dtvenda,
        n.valortotalicms as dtvenda,
        n.valortotalicmssubstrib as dtvenda,
        n.valortotalbaseipi as dtvenda,
        n.valortotalipi as dtvenda,
        n.valortotalipiisentasnaotrib as dtvenda,
        n.valortotalipiisento as dtvenda,
        n.valortotalfrete as dtvenda,
        n.valortotalseguros as dtvenda,
        n.valortotaldescontos as dtvenda,
        n.valortotaloutrasdespesas as dtvenda,
        n.valortotalbasepis as dtvenda,
        n.valortotalbasecofins as dtvenda,
        n.valortotalpis as dtvenda,
        n.valortotalcofins as dtvenda,
        n.valortotalpisiss as dtvenda,
        n.valortotalcofinsiss as dtvenda,
        n.valortotalbaseiss as dtvenda,
        n.valortotaliss as dtvenda,
        n.valortotalservicos as dtvenda,
        n.valortotalii as dtvenda,
        n.valortotalnt as dtvenda,
        n.valortotalcancelados as dtvenda,
        n.valortotalisentanaoinciencia as dtvenda,
        n.valortotalfcpufdest as dtvenda,
        n.valortotalicmsufdest as dtvenda,
        n.valortotalipidevolvido as dtvenda,
        n.valorfundocombatepobreza as dtvenda,
        n.valorfundocombatepobrezast as dtvenda,
        n.valorfundocombatepobrezaret as dtvenda,
        n.consignacao as dtvenda,
        n.status as dtvenda,
        n.estped as dtvenda,
        n.statusnfce as dtvenda,
        n.impressao as dtvenda,
        n.horasaida as dtvenda,
        n.placa as dtvenda,
        n.ufplaca as dtvenda,
        n.rntc as dtvenda,
        n.codtransportador as dtvenda,
        n.cnpjcpftransportador as dtvenda,
        n.nometransportador as dtvenda,
        n.ietransportador as dtvenda,
        n.enderecotransportador as dtvenda,
        n.nomemunicipiotransportador as dtvenda,
        n.uftransportador as dtvenda,
        n.numdocnfe as dtvenda,
        n.obs as dtvenda,
        n.descricaoobjconserto as dtvenda,
        n.codmodelodocfiscal as dtvenda,
        n.modalidadefrete as dtvenda,
        n.especiesvolumes as dtvenda,
        n.marcasvolumes as dtvenda,
        n.numeracaovolumes as dtvenda,
        n.qtdvolumes as dtvenda,
        n.pesobruto as dtvenda,
        n.pesoliquido as dtvenda,
        n.informacoescomplementares as dtvenda,
        n.informacoesfisco as dtvenda,
        n.segurancahash as dtvenda,
        n.codigomesa as dtvenda,
        n.codigocop as dtvenda,
        n.cancdurantevenda as dtvenda,
        n.codigosupervisor as dtvenda,
        n.codinfcompi as dtvenda,
        n.estoqueestornado as dtvenda,
        n.numregdpec as dtvenda,
        n.inddpec as dtvenda,
        n.finalidadenfe as dtvenda,
        n.justepec as dtvenda,
        n.finalizouestoque as dtvenda,
        n.tentativasdetransmissao as dtvenda,
        n.dtbaixaestoque as dtvenda,
        n.consumidorfinal as dtvenda,
        n.destinodaoperacao as dtvenda,
        n.tipoatendimento as dtvenda,
        n.faturamentoimportacao as dtvenda,
        n.dhcont as dtvenda,
        n.tentativasdevalidacao as dtvenda,
        n.tentativasdeassinatura as dtvenda,
        n.lancadotbcr as dtvenda,
        n.dthtentativatransmissao as dtvenda

    from tb_notasfiscais n;