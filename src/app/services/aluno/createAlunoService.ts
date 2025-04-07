
import { host } from "../../config/appConfig";
import { AlunoInterface } from "../../models/interfaces/AlunoInterface";
import { ResponseInterface } from "../../models/interfaces/ResponseInterface";

export const createAlunoService = async (
    aluno: AlunoInterface
): Promise<ResponseInterface> => {
    try {
        const response = await fetch(
            `${host}/student/signUpStudent`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                   aluno
                }),
            }
        );

        if (!response.ok) {
            return {
                status: "error",
                message: "Resposta vazia do servidor.",
                data: null,
            };
        }

        const responseData = await response.json();

        // console.log("response: ", responseData);

        if (responseData) {
            return responseData
        }

        return {
            status: "error",
            message: "Resposta vazia do servidor.",
            data: null,
        };
    } catch (error) {
        console.error("Erro no signUpStudent:", error);
        return {
            status: "error",
            message: "Erro na comunicação com o servidor.",
            data: null,
        };
    }
};
