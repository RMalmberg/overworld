import React from "react";
import PropTypes from "prop-types";
import { Tab, Grid, Label, Image, Header } from "semantic-ui-react";
import countries from "i18n-iso-countries";
import Moment from "react-moment";
import "./styles.css";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export const Cover = (({id ,size, imageID, slug, key, name})=>{
     const src=`https://images.igdb.com/igdb/image/upload/t_cover_${size}/${imageID}.jpg`

    return(
     <a key={id} className="cover-wrapper" href={`/games/${slug}`} target="_blank">
         <Image src={src} rounded alt={slug} className="cover" size="big"/>
         <div key={key} class="cover-overlay">
             <strong>{name}</strong>
         </div>
     </a>
    )
});

const Similar = ({similar_games,isLoading})=>{
    return(<div className="similar">
        <Header className="white">Similar Games</Header>
        <section className="sec">
        {similar_games && !isLoading ? (
            <React.Fragment>
                {similar_games.map((g,i)=>{
                    try {
                        return (<Cover size="big" imageID={g.cover.image_id} slug={g.slug} key={i} id={g} name={g.name}/>)

                    } catch (error) {
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="placeholder" />
                        ))
                    }
                })}
            </React.Fragment>
        ):(
            <React.Fragment>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="placeholder" />
                ))}
            </React.Fragment>
        )}
    </section></div>)
};

const Details = ({ game }) => {
  const gameCountries = game.involved_companies
    ? [
        ...new Set(
          game.involved_companies
            .filter(companyInfo => companyInfo.company.country !== undefined)
            .map(companyInfo =>
              countries.getName(companyInfo.company.country, "en")
            )
        )
      ]
    : [];

/* Age Rating Enums
Category -> strings
Rating -> int/string (i had it backwards)
*/
const enums= {
'01': 'ESRB', '02': 'PEGI', 1:'Three', 2:'Seven', 3:'Twelve', 4:'Sixteen',
5:'Eighteen', 6:'RP', 7:'EC', 8:'E', 9:'E10', 10:'T', 11:'M', 12:'AO'
}

  return (
    <Tab
      className="tabs margin-top"
      menu={{ secondary: true, pointing: true }}
      panes={[
        {
          menuItem: "details",
          render: () => (
            <Tab.Pane className="details" attached={false}>
              <Grid>
                {gameCountries.length > 0 && (
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <h3>
                        <span>Country</span>
                      </h3>
                    </Grid.Column>
                    <Grid.Column width={8} className="details">
                      {gameCountries.map(country => (
                        <Label key={country}>{country}</Label>
                      ))}
                    </Grid.Column>
                  </Grid.Row>
                )}
                <Grid.Row>
                  <Grid.Column width={8}>
                    <h3>
                      <span>Release Date</span>
                    </h3>
                  </Grid.Column>
                  <Grid.Column width={8} className="details">
                    <Label>
                      <Moment format="MMMM DD YYYY">
                        {game.first_release_date * 1000}
                      </Moment>
                    </Label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <h3>
                      <span>Developers</span>
                    </h3>
                  </Grid.Column>
                  <Grid.Column width={8} className="details">
                    {game.involved_companies &&
                      game.involved_companies.map(d => {
                        return (
                          d.developer && (
                            <Label key={d.id}>{d.company.name}</Label>
                          )
                        );
                      })}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <h3>
                      <span>Publishers</span>
                    </h3>
                  </Grid.Column>
                  <Grid.Column width={8} className="details">
                    {game.involved_companies &&
                      game.involved_companies.map(d => {
                        return (
                          d.publisher && (
                            <Label key={d.id}>{d.company.name}</Label>
                          )
                        );
                      })}
                  </Grid.Column>
                </Grid.Row>
                {game.time_to_beat && game.time_to_beat.normally !== undefined && (
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <h3>
                        <span>Time to beat</span>
                      </h3>
                    </Grid.Column>
                    <Grid.Column width={8} className="details">
                      <Label>
                        {game.time_to_beat &&
                          Math.floor(game.time_to_beat.normally / 3600)}{" "}
                        hours
                      </Label>
                    </Grid.Column>
                  </Grid.Row>
                )}
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <h3>
                        <span>Age Ratings</span>
                      </h3>
                    </Grid.Column>
                    <Grid.Column width={8} className="details">
                    {game.age_ratings !== undefined && game.age_ratings.map(d => {
                    return <Label key={d.category}>{enums[0+""+d.category]+" "+enums[d.rating]}</Label>
                    })}
                    </Grid.Column>
                  </Grid.Row>
              </Grid>
            </Tab.Pane>
          )
        },
        {
          menuItem: "platforms",
          render: () => (
            <Tab.Pane attached={false}>
              {game.platforms &&
                game.platforms.map(p => {
                  return <Label key={p.id}>{p.name}</Label>;
                })}
            </Tab.Pane>
          )
        },
        {
          menuItem: "genres",
          render: () => (
            <Tab.Pane className={"genres"} attached={false}>
              {game.genres &&
                game.genres.map(g => {
                  return <Label key={g.id}>{g.name}</Label>;
                })}
              {game.themes &&
                game.themes.map(t => {
                  return <Label key={t.id}>{t.name}</Label>;
                })}
            </Tab.Pane>
          )
        },
        {
          menuItem: "similar games",
          render: () => (
            <Tab.Pane className={"similar games"} attached={false}>
              {/*{game.genres &&
                game.genres.map(g => {
                  return <Label key={g.id}>{g.name}</Label>;
                })}*/}
              {game.similar_games &&
                game.similar_games.map(s => {
                  return <Label key={s.id}>{s.name}</Label>;
                 //  return <Label>game.similar_games</Label>
                })}
            </Tab.Pane>
          )
        }
      ]}
    />
  );
};

Details.propTypes = {
  game: PropTypes.object.isRequired
};

export default Details;
