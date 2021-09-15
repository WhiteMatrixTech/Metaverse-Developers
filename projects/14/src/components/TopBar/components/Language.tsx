import React, { useCallback } from 'react'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Container from '../../Container'
import styled from 'styled-components'
import i18n from "i18next";
import { useTranslation} from 'react-i18next'

const Language: React.FC = () => {

    const changeLanguage=useCallback((type)=>{
            i18n.changeLanguage(type)
    },[])
    let { t} = useTranslation()

    return (
        <Container>
            <StyledWrapper>
                <Label text={t("Language")}></Label>
                <img onClick={()=>changeLanguage("en")} style={{cursor:"pointer",marginLeft:"10px"}} 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFGmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDgtMjdUMTQ6NDI6MzErMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTA4LTI3VDE0OjQzOjU4KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA4LTI3VDE0OjQzOjU4KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmVjNmI1OTc5LTU2YmQtNGViMy1iMzBkLTYyMzg4MGFkMTI5YiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDplYzZiNTk3OS01NmJkLTRlYjMtYjMwZC02MjM4ODBhZDEyOWIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplYzZiNTk3OS01NmJkLTRlYjMtYjMwZC02MjM4ODBhZDEyOWIiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVjNmI1OTc5LTU2YmQtNGViMy1iMzBkLTYyMzg4MGFkMTI5YiIgc3RFdnQ6d2hlbj0iMjAyMC0wOC0yN1QxNDo0MjozMSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3+wEFQAAAkhJREFUSMftl8srRFEcx+8/wN7KSiwUZaNY2ZEkC5NYeCTCYqYmERakKMljcVGTEBsp1GjG1Ewjj8Z4jVkwk6EZ45XX2FBSjvu7Obdr5p7HtRgbU9+ae88538+55/E7vyMghASWzNPH6TUje5ax1cDui/S7KKhCASFT0VXHEJJe+4r7do7qx/cHeDyZwKKerZBQYUWgjlk/ABABjHC9tAbHB3T0V2BomFJt+8RmesBYOSZ3zGjxFXKDJZOZqmFvgpFeMMhmFt+vzIPdTHC4rPnkYdMrG8XD9YKXTaJcHkzNg/JaInhnYmUFV9SC6wGrod9eL4NLJyUJ4Cbx0EhooMB5wSQPWHSwYH+A4SWrIQ+Y1nFQ+YDHrYBhBdPmBxts+q+pYHv7JBUKgp0CX53wtSw4DcyCYhmGvMtC69SRQauQBieBeaCgjBbnm+A7u+u0eiKIJBheMLu3utCT/5QKxuWRm0dE8wTJwQIPIa9IYD0SznPKYmqTZOkfnDzwny0unu2EKz9HolQwbDlQOBBmbydWABHXgrLprTivAEhgqAPPoexSVNfvpgcQCJnyHwZUDaANNQ9cDpmkQyIeCkZb20EqeMF1zoT/OCTiDwotKBjwHIuktprHojoRoDXkTQRIHjClmqmP4yA6SuutntQnHn6RX/mhmfpg3VkW7aT50ZvsKfDx2bdoa6+Bmd5eNnZtaK3I36S3c87Qq1SWy53Qw1Uk6Qm9+goDqxB3gBec1eZ6Z92hBD2XNsv6mV0ChAlgtxQYPBAJeTy/ANI2R1D/diavAAAAAElFTkSuQmCC"></img>
                <Spacer size="sm"></Spacer>
                <img onClick={()=>changeLanguage("zh")} style={{cursor:"pointer",marginLeft:"10px"}} 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAFoqSavAAAACXBIWXMAAAsSAAALEgHS3X78AAAFKUlEQVRIiZ1Xa0xcRRSevSyPXZaFyqvWRCSCBX8JCRi1tArGGquVpUHahIIt1ZgW0zWmtrQYMdJC1UijxKgRFWIUNC018UGrYB/YWDBiommp5UerUVt5LOzyWhZ2zXd2Zzr37uWW+iU3c+/snDmPOeebsywQCNDjebcpDSN9XLlnZQDAqIxtKXGlnhlkC1f+ZoAJK67emxVgIdCEDBPkbFXVbLKlmcUUPnxSbDi2YzNtShMT9XsCfo8b89f2kDemvWJtgZRvf1LYeN2uTr4N3wrwXTwftFO5KbE9tANJmjOzaRytKL5mt56K2PKnCmzbn+8VscDjfrOxTP4WRmqlgdQzgyaMyvDja3zSpFgghLgHsFoG5nEEChb9+1A+M2dkiYiPbCiiceGPS620IDDppomI5SuC48230Bhff+h+xVpa/hw+plqaKRZ45n7uE7ZEHOjq+dE/NhIz/ckHq/S8CDtPl7NqaK7vh9u1bgOWRze02Pfu36Y6s8UiDcQ59zLrExXkJPeDyQetTbGo3HxhvyamegaRG6bRJx0u34VzCZhIOd4f1GCLI63JR7rpPTDpoRGYHxoUiQKXzKb4ZaOMsYTgeeQxbknkHVlsbqCPeU99x+z7GnQtMVksv4XlimWdQwhwIe7OaKWDzV88r4qDCKJR9LWwbtqyMe7Z3R1M7xgB94F973vP9lb6h6+a8R258s7xyNy7n+FCKmjzX1Ufb7ziNPpdpX3yvUNpUx+9c0nPZCU5dT75i5ORqjn+At8XEwTgBoLsfq2uQSU8vnv7gDZoJpudciGx7ahqk5nO9j2etw6WCWHv6Z67tJpSjvdRssx81RlmxfSnHxLzqMpfD5yStJh4+YVOIk0WyrJlzW20BJWfdLibeU93s6icfJGuTJN1ImC8UEAdEESOw2T/pEfjTr94N8s/oBDAPSxUMJGZWUQzsGC6o1XFJGHCvIKiVz9ICxG06c/aqN79Hk+YsPCZw1pWyeJ21qgWcYtkf823ps8oqFMxkZnNcONwuKor2MzXR4UrMqIL12aHlSdMhq9THW2ClrDh7KluUZrQmtj+jdWQ3/Qgc5s4KuKpWJvhBihPLsj0ahqV5Tv3a7ec69EFhb8kHHw7R7uZLiFogQ39I8MvLvx5eZ1vaDA1MDVp0q5BHCLS0i8oSSld9l11Ndfd1Eg5GGn2+2Nb9RQtFQhTVN59j9EtvhTlN8KpLFSTgO/3QdWlpYXhbehpqndOf/5x01IUgqPk3AURLPzz13XlwKaWdY4M29POy0I5Qjzz5eGqpShOOtJD9c57D7zPDfQz147NSxGnVLeWlqfDAAWsqqcY9x4PqQzRzyxfQQ/YC6Rjr20kGf6AveRq50AOeXuOUbWaxnZuDTtj0ERiaziDg91AUJZHisnzkZJCEQkZMjuyUI+FJlcG+i8lMOFK1CoBjYANtYguKKLfcMZILniGswaHYQ7GkfEhxe79NUSGoCbcaTL8oyPFquZHD1AAppVvE5wxQp3Q2EyKEXLuPY5huKTIMPMBi2NjoxJxW8YJo0UIFzbjXgFROXmkOPiuzgsYGbx87WF7yQARKfEvveoAOxkttG2rppDDK9kInDvYX3vmALq+xRCzdj31E6LO0QXw/ooD10t8bYMq5CwU2on6GmonRTRy86lLxnkblR7+WaHjZ1qGm6h1npjt6VpjGC8DoFUF0/F7Twbq27K+dJPcMOpyOzowvUbq/0BPqaFyDtxm+NfkPdu7+kYuGNBo9KoHXje83Rhj/wH5A014oh06vgAAAABJRU5ErkJggg=="></img>
            </StyledWrapper>
        </Container>
    )
}

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  width:140px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

export default Language