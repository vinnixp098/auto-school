
import { host } from "../../config/appConfig";
import { ResponseInterface } from "../../models/interfaces/ResponseInterface";

export const alunosService = async (): Promise<ResponseInterface> => {
    try {
        const response = await fetch(
            `${host}/student/getAllStudents`,
            {
                method: "GET"
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

        console.log("response: ", responseData);

        if (responseData) {
            return responseData
        }

        return {
            status: "error",
            message: "Resposta vazia do servidor.",
            data: null,
        };
    } catch (error) {
        console.error("Erro no getAllStudents:", error);
        return {
            status: "error",
            message: "Erro na comunicação com o servidor.",
            data: null,
        };
    }
};
