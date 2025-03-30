
import { getUrl } from "../../config/appConfig";
import { ResponseInterface } from "../../models/interfaces/ResponseInterface";

export const loginService = async (
    usuario: string,
    senha: string
): Promise<ResponseInterface> => {
    try {
        const response = await fetch(
            `${getUrl}/user/signInUser`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuario,
                    senha,
                }),
            }
        );

        console.log("response: ", response);

        if (!response.ok) {
            return {
                status: "error",
                message: "Resposta vazia do servidor.",
                data: null,
            };
        }

        const responseData = await response.json();

        if (responseData) {
            return {
                status: "success",
                message: "Usuário logado com sucesso",
                data: responseData,
            };
        }

        return {
            status: "error",
            message: "Resposta vazia do servidor.",
            data: null,
        };
    } catch (error) {
        console.error("Erro no signinUser:", error);
        return {
            status: "error",
            message: "Erro na comunicação com o servidor.",
            data: null,
        };
    }
};
