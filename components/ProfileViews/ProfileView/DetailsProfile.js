import {TextInput, Text} from "react-native";
import Styles from "../../../globalStyles/Styles";
import {formatDayOrMonth} from "../../helperFunctions";
import React from "react";

// Detaljer på Profile siden
function DetailsComponent (props) {
    return <>
        {/* Tekst felt med brugerens fornavn */}
        <Text style={{fontWeight: 'bold', color: '#4E3D42'}}>{'\n'}First Name</Text>
        <TextInput
            value={props.globalUser.firstname}
            placeholder={props.globalUser.firstname}
            style={Styles.inputV2}
            editable={false}
        />

        {/* Tekst felt med brugerens efternavn */}
        <Text style={{fontWeight: 'bold', color: '#4E3D42'}}>{'\n'}Last Name</Text>
        <TextInput
            value={props.globalUser.lastname}
            placeholder={props.globalUser.lastname}
            style={Styles.inputV2}
            editable={false}
        />

        {/* Tekst felt med brugerens email */}
        <Text style={{fontWeight: 'bold', color: '#4E3D42'}}>{'\n'}Email</Text>
        <TextInput
            value={props.globalUser.username}
            placeholder={props.globalUser.username}
            style={Styles.inputV2}
            editable={false}
        />

        {/* Tekst felt med brugerens fødselsdag */}
        <Text style={{textAlign: "left", fontWeight: 'bold', color: '#4E3D42'}}>{'\n'}Birthday</Text>
        <TextInput
            value={formatDayOrMonth(props.globalUser.birtDate) + "-" + formatDayOrMonth(props.globalUser.birthMonth) + "-" + props.globalUser.birthYear}
            placeholder={formatDayOrMonth(props.globalUser.birtDate) + "-" + formatDayOrMonth(props.globalUser.birthMonth) + "-" + props.globalUser.birthYear}
            style={Styles.inputV2}
            editable={false}
        />

        {/* Tekst felt med brugerens interesser */}
        <Text style={{fontWeight: 'bold', color: '#4E3D42'}}>{'\n'}Interests</Text>
        <TextInput
            value={props.globalUser.interests}
            placeholder={props.globalUser.interests}
            style={Styles.inputV2}
            editable={false}
        />
    </>;
}
export default DetailsComponent;