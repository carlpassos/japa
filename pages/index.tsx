import { Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { JapaInput } from "../Components/Form/JapaInput"
import { CopyBlock, dracula } from "react-code-blocks";
import { templateHtmlThree, templateHtmlFive} from "../util/codeTemplate"

export default function Home() {

  const [carouselId, setCarouselId] = useState("")
  const [className, setClassName] = useState("")
  const [videoNumbers, setVideoNumbers] = useState(0)
  const [templateHtmlTwo, setTemplateHtmlTwo] =useState("")
  const [videosArray, setVideosArray] = useState(null)

  useEffect(() => {
    setVideosArray(null)
    let newVideosArray = []
    let newTemplateHtmlTwo = ""
    const nextLine = `
                      `
    for (var i = 1; i <= videoNumbers; i++) {
      newVideosArray = [...newVideosArray, i]
      newTemplateHtmlTwo += `<li data-target="#carouselExampleIndicators${carouselId}" data-slide-to="${i-1}" ${i === 1 ? 'class="active"' : '' }></li>${i !== videoNumbers ? nextLine : ""}`
      setVideosArray(newVideosArray)
      setTemplateHtmlTwo(newTemplateHtmlTwo)
    }
  }, [videoNumbers])

  const templateHtmlOne = `
  <div class="accordion " id="accordion${carouselId}">
  <div class="card">
      <div class="card-header" id="heading${carouselId}">
          <h2 class="clearfix mb-0">
              <a class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${carouselId}" aria-expanded="false" aria-controls="collapse${carouselId}">
    <span style="font-weight: normal;">${className}</span>
              </a>
          </h2>
      </div>
  
      <div id="collapse${carouselId}" class="collapse" aria-labelledby="heading${carouselId}" data-parent="#accordion${carouselId}" style="">
  
          <div class="card-body">
  
              <!-- Carrossel - ${carouselId} -->
  
  
  
              <div id="carouselExampleIndicators${carouselId}" class="carousel slide" data-ride="carousel" data-interval="false" data-wrap="false">
  
                  <ol class="carousel-indicators">
                      `

  return (
    <Stack w="100vw" minH="100vh" align="center" p="50px" spacing={5}>
      <Heading textTransform="uppercase" fontSize={25} pb="10px">
        Gerador de Carrosseis
      </Heading>
          <JapaInput
            onChange={(e) => setCarouselId(e.currentTarget.value)}
            label="Id do carrossel"
            placeholder="Ex: Aula01"
          />
          <JapaInput
            onChange={(e) => setClassName(e.currentTarget.value)}
            label="Nome Aula"
            placeholder="Ex: Aula 01 - Conhecendo"
          />
          {className && carouselId ? (
            <Flex w="500px" align="flex-end">
           <JapaInput
              type="number"
              onChange={(e) => setVideoNumbers(Number(e.currentTarget.value))}
              label="Qtd de Videos"
              placeholder="Digite a quantidade de videos"
            />
          </Flex>
          ) :
          <Text color="red">Preencha os campos acima</Text>
          }
          {videosArray &&
            videosArray.map(number => {
              return (
              
                <Grid key={`flexdosinputs${number}`} gap={5} templateColumns="1fr 1fr">
                  <JapaInput
                    id={`nome${number}`}
                    label={`Nome do video ${number}`}
                    placeholder={`Digite o nome do video ${number}`}
                  />
                  <JapaInput
                    id={`url${number}`}
                    label={`Url do video ${number}`}
                    placeholder={`Digite a url do video ${number}`}
                  />
                </Grid>
            )
            })
          }

          <Heading mt="100px !important" mb="20px !important">
            {className}
          </Heading>

              {carouselId && className && videoNumbers &&
                <CopyBlock
                style={{width: "100%"}}
                language="html"
                text={templateHtmlOne+templateHtmlTwo+templateHtmlThree+templateHtmlFive}
                showLineNumbers={true}
                theme={dracula}
                wrapLines={true}
                codeBlock
              />
              }

    </Stack>
    )
}