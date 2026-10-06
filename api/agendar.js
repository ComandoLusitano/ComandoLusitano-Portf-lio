const RESEND_API_URL =
    "https://api.resend.com/emails";


function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


export default async function handler(
    req,
    res
) {

    // Apenas POST

    if (req.method !== "POST") {

        return res.status(405).json({

            success: false,

            message:
                "Método não permitido."

        });

    }


    try {

        const {

            name,
            email,
            discord,
            service,
            date,
            time,
            message

        } = req.body || {};


        // ---------- Validação ----------

        if (
            !name ||
            !email ||
            !discord ||
            !service ||
            !date ||
            !time ||
            !message
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Preenche todos os campos."

            });

        }


        // ---------- Limites ----------

        if (
            String(name).length > 100 ||
            String(email).length > 150 ||
            String(discord).length > 100 ||
            String(service).length > 100 ||
            String(message).length > 5000
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Um ou mais campos são demasiado longos."

            });

        }


        // ---------- API KEY ----------

        const apiKey =
            process.env.RESEND_API_KEY;


        if (!apiKey) {

            console.error(
                "RESEND_API_KEY não configurada."
            );

            return res.status(500).json({

                success: false,

                message:
                    "O sistema de email ainda não está configurado."

            });

        }


        // ---------- Dados seguros ----------

        const safeName =
            escapeHtml(name);

        const safeEmail =
            escapeHtml(email);

        const safeDiscord =
            escapeHtml(discord);

        const safeService =
            escapeHtml(service);

        const safeDate =
            escapeHtml(date);

        const safeTime =
            escapeHtml(time);

        const safeMessage =
            escapeHtml(message)
            .replace(/\n/g, "<br>");


        // ========================================
        // EMAIL PARA O COMANDOLUSITANO
        // ========================================

        const ownerEmail = {

            from:
                "ComandoLusitano <onboarding@resend.dev>",

            to: [
                "contato.comandolusitano@gmail.com"
            ],

            subject:
                `📅 Nova marcação - ${safeName}`,

            html: `

                <div
                    style="
                        font-family: Arial, sans-serif;
                        max-width: 650px;
                        margin: auto;
                        color: #222;
                    "
                >

                    <h2>
                        📅 Nova marcação recebida
                    </h2>

                    <hr>

                    <p>
                        <strong>Nome:</strong>
                        ${safeName}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${safeEmail}
                    </p>

                    <p>
                        <strong>Discord:</strong>
                        ${safeDiscord}
                    </p>

                    <p>
                        <strong>Serviço:</strong>
                        ${safeService}
                    </p>

                    <p>
                        <strong>Data:</strong>
                        ${safeDate}
                    </p>

                    <p>
                        <strong>Hora:</strong>
                        ${safeTime}
                    </p>

                    <hr>

                    <h3>
                        📝 Descrição do projeto
                    </h3>

                    <p>
                        ${safeMessage}
                    </p>

                </div>

            `

        };


        // ========================================
        // EMAIL PARA O CLIENTE
        // ========================================

        const clientEmail = {

            from:
                "ComandoLusitano <onboarding@resend.dev>",

            to: [
                email
            ],

            subject:
                "✅ Marcação recebida | ComandoLusitano",

            html: `

                <div
                    style="
                        font-family: Arial, sans-serif;
                        max-width: 650px;
                        margin: auto;
                        color: #222;
                    "
                >

                    <h2>
                        Olá, ${safeName}! 👋
                    </h2>

                    <p>
                        Recebi o teu pedido de marcação
                        através do meu portfólio.
                    </p>

                    <p>
                        O teu pedido foi registado
                        com sucesso.
                    </p>

                    <hr>

                    <h3>
                        📅 Dados da marcação
                    </h3>

                    <p>
                        <strong>Serviço:</strong>
                        ${safeService}
                    </p>

                    <p>
                        <strong>Data:</strong>
                        ${safeDate}
                    </p>

                    <p>
                        <strong>Hora:</strong>
                        ${safeTime}
                    </p>

                    <p>
                        <strong>Discord:</strong>
                        ${safeDiscord}
                    </p>

                    <hr>

                    <p>
                        Entrarei em contacto contigo
                        através dos dados fornecidos.
                    </p>

                    <p>
                        Obrigado por entrares em contacto
                        com o ComandoLusitano! 🚀
                    </p>

                </div>

            `

        };


        // ========================================
        // ENVIAR EMAIL PARA TI
        // ========================================

        const ownerResponse =
            await fetch(
                RESEND_API_URL,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${apiKey}`

                    },

                    body:
                        JSON.stringify(
                            ownerEmail
                        )

                }
            );


        if (!ownerResponse.ok) {

            const error =
                await ownerResponse.text();

            console.error(
                "Erro Resend - Owner:",
                error
            );

            throw new Error(
                "Não foi possível enviar o email."
            );

        }


        // ========================================
        // ENVIAR EMAIL PARA O CLIENTE
        // ========================================

        const clientResponse =
            await fetch(
                RESEND_API_URL,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${apiKey}`

                    },

                    body:
                        JSON.stringify(
                            clientEmail
                        )

                }
            );


        if (!clientResponse.ok) {

            const error =
                await clientResponse.text();

            console.error(
                "Erro Resend - Cliente:",
                error
            );

            throw new Error(
                "Não foi possível enviar a confirmação."
            );

        }


        // ========================================
        // SUCESSO
        // ========================================

        return res.status(200).json({

            success: true,

            message:
                "Marcação enviada com sucesso."

        });


    } catch (error) {

        console.error(
            "Erro:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Erro interno ao processar a marcação."

        });

    }

}