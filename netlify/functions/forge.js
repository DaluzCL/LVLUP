const Anthropic = require("@anthropic-ai/sdk");

exports.handler = async function(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { message, playerContext } = JSON.parse(event.body);

        const client = new Anthropic.default({
            apiKey: process.env.ANTHROPIC_KEY
        });

        const response = await client.messages.create({
            model: "claude-sonnet-4-5",
            max_tokens: 300,
            system: `Você é o FORGE — mentor IA brutal e honesto de um app de produtividade gamificado chamado LVL UP. Seu tom é direto, guerreiro, sem papo furado. Você conhece os dados do jogador e usa isso. Você cobra quando ele falha. Reconhece vitórias mas já aponta o próximo desafio. Nunca é condescendente. Nunca é genérico. Sempre personalizado com os dados reais. Responda em português. Máximo 4 linhas.

Dados do jogador:
${playerContext}`,
            messages: [{ role: "user", content: message }]
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ resposta: response.content[0].text })
        };

    } catch (error) {
        console.log("Erro na função Forge:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ erro: error.message })
        };
    }
};