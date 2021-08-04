import { Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import { JapaInput } from "../Components/Form/JapaInput"
import { CopyBlock, dracula } from "react-code-blocks";
import { templateHtmlThree, templateHtmlFive} from "../util/codeTemplate"

export default function Home() {

  const [carouselId, setCarouselId] = useState("")
  const [className, setClassName] = useState("")
  const [videoNumbers, setVideoNumbers] = useState(0)
  const [videosInfo, setVideosInfo] = useState([{name: "", url: ""}])
  const [templateHtmlFour, setTemplateHtmlFour] =useState("")
  const [templateHtmlTwo, setTemplateHtmlTwo] =useState("")
  const [videosArray, setVideosArray] = useState(null)

  useEffect(() => {
    setVideosArray(null)
    let newVideosArray = []
    let newTemplateHtmlTwo = ""
    let newvideosInfo = []
    const nextLine = `
                      `
    for (var i = 1; i <= videoNumbers; i++) {
      newVideosArray = [...newVideosArray, i]
      newTemplateHtmlTwo += `<li data-target="#carouselExampleIndicators${carouselId}" data-slide-to="${i-1}" ${i === 1 ? 'class="active"' : '' }></li>${i !== videoNumbers ? nextLine : ""}`
      newvideosInfo = [...newvideosInfo, {name: "", url: ""} ]
      setVideosArray(newVideosArray)
      setTemplateHtmlTwo(newTemplateHtmlTwo)
      setVideosInfo(newvideosInfo)
    }
  }, [videoNumbers])


  useEffect(() => {
    let newTemplateHtmlFour = ""

    for (var i = 1; i <= videoNumbers; i++) {
      newTemplateHtmlFour += `
      <!-- ${carouselId}.${i} -->


      <div class="carousel-item ${i === 1 ? 'active' : '' }">
          <iframe src="https://player.vimeo.com/video/${videosInfo[i-1].url}" allow="autoplay; fullscreen " allowfullscreen=" " width="640 " height="360 " frameborder="0 "></iframe>
          <div class="card-footer bg-transparent">
              <h5>${videosInfo[i-1].name}</h5>
              <p> Aula ${i < 9 ? `0${i}` : i} de ${videoNumbers < 9 ? `0${videoNumbers}` : videoNumbers}</p>

          </div>

      </div>

      `

      setTemplateHtmlFour(newTemplateHtmlFour)
    }
  }, [videosInfo])

  const insertVideoData = (index, type, data) => {
    let newVideoInfo = videosInfo;
    
    const newName = type === "name" ? data : newVideoInfo[index].name
    const newUrl = type === "url" ? data : newVideoInfo[index].url

    newVideoInfo[index] = {
      name: newName,
      url: newUrl
    }
    setVideosInfo([...newVideoInfo])
  }

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
    <Stack w="100vw" minH="100vh" align="center" p="50px 10px" spacing={5}>
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
            <>
            <Text mt="40px !important" fontSize="20px" fontWeight="semibold">
              Informe a URL e o titulo dos videos:
            </Text>
            <Grid gridTemplateColumns="1fr 1fr 1fr" gap={5}>
              {
              videosArray.map(number => {
                return (
                
                 <Stack
                    border={
                      `1px solid
                      ${videosInfo[number - 1].name && videosInfo[number - 1].url.length > 6 ?
                        "rgba(84, 255, 152, 0.332)" :
                        "rgba(255, 84, 84, 0.332)"}
                      `}
                    p="10px"
                    key={`flexdosinputs${number}`}
                    gap={5}
                    borderRadius="5px"
                    justify="center"
                    templateColumns="1fr 1fr"
                  >
                    <Flex
                      w="100%"
                      h="140px"
                      backgroundColor="whiteAlpha.100"
                      align="center"
                      justify="center"
                      borderRadius="5px"
                      position="relative"
                      role="group"
                    >
                       {videosInfo[number - 1].url.length > 6 && <iframe src={`https://player.vimeo.com/video/${videosInfo[number - 1].url}`} allow="autoplay; fullscreen" width="100%" height="100%"></iframe>}
                      <Flex
                        _groupHover={{
                          display: `${videosInfo[number - 1].url.length > 6 ? "none" : "flex"}`,
                        }}
                        w="100%"
                        h="100%"
                        bgColor="blackAlpha.800"
                        position="absolute"
                        align="center"
                        justify="center"
                        zIndex="100"
                      >
                      <Text
                        color={!videosInfo[number - 1].name ? "red.800" : "white"}
                        fontWeight="semibold"
                        fontSize="20px"
                      >
                       {videosInfo[number - 1].name ? videosInfo[number - 1].name :  "Informe o Titulo"}
                      </Text>
                      </Flex>
                    </Flex>
                    <JapaInput
                      onChange={(e) => {insertVideoData(number-1, "name", e.currentTarget.value)}}
                      id={`nome${number}`}
                      label={`Nome do video ${number}`}
                      placeholder={`Digite o nome do video ${number}`}
                    />
                    <JapaInput
                      onChange={(e) => {insertVideoData(number-1, "url", e.currentTarget.value)}}
                      id={`url${number}`}
                      label={`Url do video ${number}`}
                      placeholder={`Digite a url do video ${number}`}
                    />
                  </Stack>
              )
              })
            }
            </Grid>
            </>
          }

          <Heading mt="100px !important" mb="20px !important">
            {className}
          </Heading>
          
            

            

              {carouselId && className && videoNumbers &&
                <Flex maxW="800px" className="codeFlex">
                  <CopyBlock
                    language="html"
                    text={templateHtmlOne+templateHtmlTwo+templateHtmlThree+templateHtmlFour+templateHtmlFive}
                    showLineNumbers={true}
                    theme={dracula}
                    wrapLines={true}
                    codeBlock
                  />
              </Flex>
              }

    </Stack>
    )
}