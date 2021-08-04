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
                text={templateHtmlOne+templateHtmlTwo+templateHtmlThree+templateHtmlFour+templateHtmlFive}
                showLineNumbers={true}
                theme={dracula}
                wrapLines={true}
                codeBlock
              />
              }

    </Stack>
    )
}