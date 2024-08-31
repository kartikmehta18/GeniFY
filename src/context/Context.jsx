import { createContext, useState } from "react";
import run from "../config/ai";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);
        }, 75 * index)
    }

    const newChat =() =>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {

            response = await run(prompt);
            setRecentPrompt(prompt)
        } else {
            setPrevPrompts((prev) => [...prev, input])
            setRecentPrompt(input)
            response = await run(input);
        }
        // setRecentPrompt(input)
        // setPrevPrompts((prev) => [...prev, input])
        // const response = await run(input);
        // doing for proper formating of result
        let resonseArray = response.split("**")
        let newResponse = "";
        for (let i = 0; i < resonseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += resonseArray[i];
            }
            else {
                newResponse += "<b>" + resonseArray[i] + "</b>"
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")
        // setResultData(newResponse2);
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");

    }

    // onSent("What is reactjs")

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setResultData,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        setRecentPrompt,
        newChat,
    }
    
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;

// import { createContext, useState } from "react";
// import run from "../config/ai";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [prevPrompts, setPrevPrompts] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");

//   const delayPara = (index, nextWord) => {
//     setTimeout(() => {
//       setResultData((prev) => prev + nextWord);
//     }, 75 * index);
//   };

//   const onSent = async (prompt) => {
//     setResultData("");
//     setLoading(true);
//     setShowResult(true);
    
//     let response;
//     if (prompt) {
//       response = await run(prompt);
//       setRecentPrompt(prompt);
//       setPrevPrompts((prev) => [...prev, prompt]);
//     } else {
//       setPrevPrompts((prev) => [...prev, input]);
//       setRecentPrompt(input);
//       response = await run(input);
//     }

//     const responseArray = response.split("**");
//     let formattedResponse = responseArray.map((segment, index) => {
//       return index % 2 === 1 ? `<b>${segment}</b>` : segment;
//     }).join("");

//     formattedResponse = formattedResponse.split("*").join("</br>");

//     const wordsArray = formattedResponse.split(" ");
//     wordsArray.forEach((word, i) => {
//       delayPara(i, word + " ");
//     });

//     setLoading(false);
//     setInput("");
//   };

//   const contextValue = {
//     prevPrompts,
//     setPrevPrompts,
//     onSent,
//     setResultData,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//     setRecentPrompt, // Ensure this is included
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;
