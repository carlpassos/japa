import {
  FormLabel,
  Input,
  InputGroup,
  InputProps
} from "@chakra-ui/react"

interface JapaInputProps extends InputProps {
  label: string;
}

export function JapaInput({label, ...rest}: JapaInputProps) {
  return(
    <InputGroup display="flex" flexDir="column" maxW="500px">
      <FormLabel>{label}</FormLabel>
      <Input {...rest}></Input>
    </InputGroup>
  )
}